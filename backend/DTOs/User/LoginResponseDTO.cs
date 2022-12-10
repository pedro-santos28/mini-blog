namespace backend.DTOs.User;

public class LoginResponseDTO
{
    public string access_token { get; set; }
    public DateTime expiration { get; set; }

    public LoginResponseDTO(string access_token, DateTime expiration)
    {
        this.access_token = access_token;
        this.expiration = expiration;
    }
}
