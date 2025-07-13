using System.Net;

namespace FactCheckBack.Models.Configurations
{
    public class ApiResponse<T>
    {
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;
        public string? Message { get; set; }
        public bool IsSuccess { get; set; } = true;
        public List<string> Errors { get; set; } = [];
        public T? Data { get; set; }

        private ApiResponse() { }

        public static ApiResponse<T> Success(T data, HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            return new ApiResponse<T>
            {
                StatusCode = statusCode,
                IsSuccess = true,
                Message = null,
                Data = data
            };
        }
        public static ApiResponse<T> Fail(List<string> errors, 
            HttpStatusCode statusCode = HttpStatusCode.BadRequest, T? data = default)
        {
            return new ApiResponse<T>
            {
                StatusCode = statusCode,
                IsSuccess = false,
                Message = null,
                Data = data,
                Errors = errors
            };
        }
        public static ApiResponse<T> Fail(string error,
            HttpStatusCode statusCode = HttpStatusCode.BadRequest, T? data = default)
        {
            return Fail([error], statusCode, data);
        }
        
        
        public static ApiResponse<T> NotFound(string message)
        {
            return new ApiResponse<T>
            {
                StatusCode = HttpStatusCode.NotFound,
                IsSuccess = true,
                Message = message,
                Data = default
            };
        }
    }
}
