using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace OAT.AuthApi.Config
{
    public class SwaggerDocumentFilter : IDocumentFilter
    {
        public const string VersionEndPoint = "/connect/token";

        public void Apply(OpenApiDocument openApiDocument, DocumentFilterContext context)
        {
            var operation = new OpenApiOperation();
            operation.Tags.Add(new OpenApiTag { Name = "Authentication" });

            var properties = new Dictionary<string, OpenApiSchema>
            {
                { "access_token", new OpenApiSchema() { Type = "string" } },
                { "token_type", new OpenApiSchema() { Type = "string" } },
                { "expires_in", new OpenApiSchema() { Type = "number" } },
                { "scope", new OpenApiSchema() { Type = "string" } },
                { "refresh_token", new OpenApiSchema() { Type = "string" } }
            };

            var response = new OpenApiResponse
            {
                Description = "Success"
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


            operation.RequestBody = new OpenApiRequestBody
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

            var pathItem = new OpenApiPathItem();
            pathItem.AddOperation(OperationType.Post, operation);
            openApiDocument?.Paths.Add(VersionEndPoint, pathItem);
        }
    }
}
