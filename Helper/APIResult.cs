using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SchoolWeb.Helper
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class APIResult
    {
        public string ErrorMessage { get; set; }
        public bool Success { get; set; }
        public Object Result { get; set; }


        public static APIResult New()
        {
            return new APIResult();
        }

        public APIResult WithError(string error)
        {
            this.ErrorMessage = error;
            this.Success = false;
            this.Result = null;
            return this;
        }

        public APIResult WithResult(Object result)
        {
            this.Result = result;
            return this;
        }

        public APIResult WithSuccess()
        {
            this.Success = true;
            return this;
        }

        public APIResult WithFail()
        {
            this.Success = false;
            return this;
        }
    }
}