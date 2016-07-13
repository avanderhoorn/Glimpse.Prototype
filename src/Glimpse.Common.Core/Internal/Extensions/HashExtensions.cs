using System.ComponentModel;
using System.Security.Cryptography;
using System.Text;

namespace Glimpse.Internal.Extensions
{
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class HashExtensions
    {
        private static readonly MD5 _md5 = MD5.Create();

        public static string Md5(this string input)
        {
            return Md5(input, Encoding.UTF8);
        }

        public static string Md5(this string input, Encoding encoding)
        {
            return Md5(encoding.GetBytes(input));
        }

        public static string Md5(this byte[] input)
        {
            var hash = _md5.ComputeHash(input);

            StringBuilder sb = new StringBuilder();
            foreach (var b in hash)
            {
                sb.Append(b.ToString("X2"));
            }
            return sb.ToString();
        }

        // 24 Initial and Polynomial parameters as defined by OpenPGP spec/usage: http://reveng.sourceforge.net/crc-catalogue/17plus.htm
        private const int _init24 = 0x0b704ce;
        private const int _poly24 = 0x1864cfb;

        public static string Crc24(this string input)
        {
            return Crc24(input, Encoding.UTF8);
        }

        public static string Crc24(this string input, Encoding encoding)
        {
            return Crc24(encoding.GetBytes(input));
        }

        public static string Crc24(this byte[] input)
        {
            int crc = _init24;

            for (int i = 0; i < input.Length; i++)
            {
                crc ^= input[i] << 16;

                for (int j = 0; j < 8; j++)
                {
                    crc <<= 1;
                    if ((crc & 0x1000000) != 0)
                    {
                        crc ^= _poly24;
                    }
                }
            }

            return crc.ToString("X6");
        }

        // 32 Initial and Polynomial parameters the same as Glimpse 1.X
        private const uint _init32 = 0xffffffff;
        private const uint _poly32 = 0xedb88320;
        private static readonly uint[] _crc32Cache;

        public static string Crc32(this string input)
        {
            return Crc32(input, Encoding.UTF8);
        }

        public static string Crc32(this string input, Encoding encoding)
        {
            return Crc32(encoding.GetBytes(input));
        }

        public static string Crc32(this byte[] input)
        {
            uint crc = _init32;
            for (int i = 0; i < input.Length; ++i)
            {
                byte index = (byte)(((crc) & 0xff) ^ input[i]);
                crc = (crc >> 8) ^ _crc32Cache[index];
            }
            return (~crc).ToString("X8");
        }

        static HashExtensions()
        {
            _crc32Cache = new uint[256];
            for (uint i = 0; i < _crc32Cache.Length; ++i)
            {
                var temp = i;
                for (int j = 8; j > 0; --j)
                {
                    if ((temp & 1) == 1)
                        temp = (temp >> 1) ^ _poly32;
                    else
                        temp >>= 1;
                }
                _crc32Cache[i] = temp;
            }
        }
    }
}