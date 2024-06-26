using Backend.Aplication.InputModels;
using Backend.Aplication.Services.Interfaces;
using Backend.Aplication.ViewModels;
using Backend.Domain.Entities;
using Backend.Domain.interfaces;
using Backend.Domain.Services;
using Backend.Domain.Validators;
using Backend.Infra.Repositories.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.Services
{
    public class LogService : ILogService
    {
        private readonly IBaseRepository<Log> _repository;
        private readonly IBaseRepository<User> _userRepository;
        private readonly AppSettings _settings;
        private readonly Guid userId;
        private readonly ISocketManager _socketManager;

        public LogService(
            IBaseRepository<Log> repository,
            IBaseRepository<User> userRepository,
            IOptions<AppSettings> settings,
            ISocketManager socketManager,
            IHttpContextAccessor context
        )
        {
            _settings = settings.Value;
            _repository = repository;
            _userRepository = userRepository;
            _socketManager = socketManager;

            var user = context?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);
            if (user != null) userId = Guid.Parse(user.Value);
        }
        public async Task<ResultValidator<List<LogViewModel>>> GetAll()
        {
            var logs = await _repository.Select(l => !l.Disabled);
            var result = new List<Log>();
            foreach(var l in logs)
            {
                l.CreatedBy = await _userRepository.Get(l.CreatedById);
                if(l.CreatedBy != null)
                    result.Add(l);
            }
            return ResultService<List<LogViewModel>>.Ok(result.Select(LogViewModel.FromModel).ToList());
        }

        public async Task Insert(LogInputModel input)
        {
            var log = new Log()
            {
                Message = input.Message,
                Title = input.Title,
                Type = input.Type,
                CreatedById = userId,
                CreatedAt = DateTime.UtcNow,
                Disabled = false,
            };
            log.Id = await _repository.Insert(log);
            log.CreatedBy = await _userRepository.Get(userId);

            await _socketManager.SendMessageToSubsAsync("/logs", LogViewModel.FromModel(log));
        }
    }
}
