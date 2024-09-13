namespace OAT.AuthApi.Config
{
    public class KestrelData
    {
        public string CertificatePath { get; set; }
        public int HttpPort { get; set; }
        public int HttpsPort { get; set; }
        public string ProxyServerIP { get; set; }
    }
}
