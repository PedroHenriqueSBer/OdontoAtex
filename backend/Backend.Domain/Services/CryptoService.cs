using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Services
{
    public class CryptoService
    {
        private static readonly string key = "$2a$06$TyDxhsHd.luB1S0gvqV4pu/iEc50Dx9sEwY971Z2Ph9aD/SwN3CMm";

        static byte[] GenerateKey(string key)
        {
            using SHA256 sha256 = SHA256.Create();
            byte[] keyBytes = Encoding.UTF8.GetBytes(key);
            return sha256.ComputeHash(keyBytes);
        }

        public static string Encrypt(string data)
        {
            try
            {
                if (data == null)
                    return null;
                if (data.Length <= 2)
                    data = $"**{data}";
                using Aes aesAlg = Aes.Create();
                aesAlg.Key = GenerateKey(key);
                var a = Convert.ToBase64String(aesAlg.Key.ToArray());
                aesAlg.IV = new byte[aesAlg.BlockSize / 8];

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                byte[] dataBytes = Encoding.UTF8.GetBytes(data);

                byte[] dataEncryptBytes;
                using (MemoryStream msEncrypt = new())
                {
                    using (CryptoStream csEncrypt = new(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        csEncrypt.Write(dataBytes, 0, dataBytes.Length);
                        csEncrypt.FlushFinalBlock();
                    }
                    dataEncryptBytes = msEncrypt.ToArray();
                }

                return Convert.ToBase64String(dataEncryptBytes.ToArray());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static string Decrypt(string encryptedData)
        {
            try
            {
                if (encryptedData == null)
                    return null;
                if (encryptedData.Length <= 2)
                    return encryptedData;
                using Aes aesAlg = Aes.Create();
                aesAlg.Key = GenerateKey(key);

                aesAlg.IV = new byte[aesAlg.BlockSize / 8];

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                byte[] encryptedBytes = Convert.FromBase64String(encryptedData);


                using MemoryStream msDecrypt = new(encryptedBytes);
                using CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read);
                using StreamReader srDecrypt = new(csDecrypt);
                string decryptedData = srDecrypt.ReadToEnd();
                return decryptedData.Replace("**", "");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static List<string> DecryptListData(List<string> encryptedDataList)
        {
            try
            {
                List<string> listDataDecrypt = new();
                foreach (var item in encryptedDataList)
                {
                    var encryptedData = item;
                    if (encryptedData == null)
                        return null;
                    if (encryptedData.Length <= 2)
                        return null;
                    using Aes aesAlg = Aes.Create();
                    aesAlg.Key = GenerateKey(key);

                    aesAlg.IV = new byte[aesAlg.BlockSize / 8];

                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                    byte[] encryptedBytes = Convert.FromBase64String(encryptedData);


                    using MemoryStream msDecrypt = new(encryptedBytes);
                    using CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read);
                    using StreamReader srDecrypt = new(csDecrypt);
                    string decryptedData = srDecrypt.ReadToEnd();
                    listDataDecrypt.Add(decryptedData.Replace("**", ""));
                }

                return listDataDecrypt;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static List<string> EncryptListData(List<string> listData)
        {
            try
            {
                List<string> listDataEncrypt = new();
                foreach (var item in listData)
                {
                    var data = item;
                    if (data == null)
                        return null;
                    if (data.Length <= 2)
                        data = $"**{data}";
                    using Aes aesAlg = Aes.Create();
                    aesAlg.Key = GenerateKey(key);
                    var a = Convert.ToBase64String(aesAlg.Key.ToArray());
                    aesAlg.IV = new byte[aesAlg.BlockSize / 8];

                    ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                    byte[] dataBytes = Encoding.UTF8.GetBytes(data);

                    byte[] dataEncryptBytes;
                    using (MemoryStream msEncrypt = new())
                    {
                        using (CryptoStream csEncrypt = new(msEncrypt, encryptor, CryptoStreamMode.Write))
                        {
                            csEncrypt.Write(dataBytes, 0, dataBytes.Length);
                            csEncrypt.FlushFinalBlock();
                        }
                        dataEncryptBytes = msEncrypt.ToArray();
                    }

                    listDataEncrypt.Add(Convert.ToBase64String(dataEncryptBytes.ToArray()));
                }
                return listDataEncrypt;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
