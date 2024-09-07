using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace OAT.AuthApi.Config
{
    public class SwaggerDocumentFilter : IDocumentFilter
    {
        public const string TokenEndPoint = "/connect/token";
        public const string LogOutEndPoint = "/connect/logout";

        public void Apply(OpenApiDocument openApiDocument, DocumentFilterContext context)
        {
            OpenApiRequestBody tokenEndPointRequestBody = new OpenApiRequestBody
            {
                Required = true,
                Content = new Dictionary<string, OpenApiMediaType>
                {
                    ["application/x-www-form-urlencoded"] = new OpenApiMediaType
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties = new Dictionary<string, OpenApiSchema>
                            {
                                ["username"] = new OpenApiSchema
                                {
                                    Type = "string"
                                },
                                ["password"] = new OpenApiSchema
                                {
                                    Type = "string"
                                },
                                ["grant_type"] = new OpenApiSchema
                                {
                                    Type = "string"
                                },
                                ["client_id"] = new OpenApiSchema
                                {
                                    Type = "string"
                                },
                                ["client_secret"] = new OpenApiSchema
                                {
                                    Type = "string"
                                },
                                ["refresh_token"] = new OpenApiSchema
                                {
                                    Type = "string"
                                }
                            }
                        }
                    }
                }
            };
            Dictionary<string, OpenApiSchema> tokenEndPointProperties = new Dictionary<string, OpenApiSchema>
            {
                { "access_token", new OpenApiSchema() { Type = "string" } },
                { "token_type", new OpenApiSchema() { Type = "string" } },
                { "expires_in", new OpenApiSchema() { Type = "number" } },
                { "scope", new OpenApiSchema() { Type = "string" } },
                { "refresh_token", new OpenApiSchema() { Type = "string" } }
            };

            OpenApiRequestBody logOutEndPointRequestBody = new OpenApiRequestBody
            {
                Required = true,
                Content = new Dictionary<string, OpenApiMediaType>
                {
                    ["application/x-www-form-urlencoded"] = new OpenApiMediaType
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties = new Dictionary<string, OpenApiSchema>
                            {
                                ["client_id"] = new OpenApiSchema
                                {
                                    Type = "string"
                                }
                            }
                        }
                    }
                }
            };
            Dictionary<string, OpenApiSchema> logOutEndPointProperties = new Dictionary<string, OpenApiSchema>
            {

            };

            var tokenEndpointPathItem = GetEndPointPathItem("Authentication",
                "Success", tokenEndPointRequestBody, tokenEndPointProperties);
            var logOutEndPointPathItem = GetEndPointPathItem("LogOut",
                "Success", logOutEndPointRequestBody);

            openApiDocument?.Paths.Add(TokenEndPoint, tokenEndpointPathItem);
            openApiDocument?.Paths.Add(LogOutEndPoint, logOutEndPointPathItem);
        }

        private static OpenApiPathItem GetEndPointPathItem(string name,
           string responseDescription, OpenApiRequestBody requestBody,
           Dictionary<string, OpenApiSchema>? properties = null)
        {
            var operation = new OpenApiOperation();
            operation.Tags.Add(new OpenApiTag { Name = name });

            var response = new OpenApiResponse
            {
                Description = responseDescription
            };

            response.Content.Add("application/json", new OpenApiMediaType
            {
                Schema = new OpenApiSchema
                {
                    Type = "object",
                    AdditionalPropertiesAllowed = true,
                    Properties = properties,
                }
            });
            operation.Responses.Add("200", response);
            operation.RequestBody = requestBody;

            var pathItem = new OpenApiPathItem();
            pathItem.AddOperation(OperationType.Post, operation);
            return pathItem;
        }
    }
}
