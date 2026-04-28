FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY FactCheckBack.sln ./
COPY FactCheckBack.API/FactCheckBack.API.csproj FactCheckBack.API/
COPY FactCheckBack.Business/FactCheckBack.Business.csproj FactCheckBack.Business/
COPY FactCheckBack.Data/FactCheckBack.Data.csproj FactCheckBack.Data/
COPY FactCheckBack.Models/FactCheckBack.Models.csproj FactCheckBack.Models/

RUN dotnet restore FactCheckBack.API/FactCheckBack.API.csproj

COPY . .
RUN dotnet publish FactCheckBack.API/FactCheckBack.API.csproj -c Release -o /out /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
COPY --from=build /out .
EXPOSE 8080
# Usa $PORT de Render (default 8080 local)
CMD sh -lc "ASPNETCORE_URLS=http://0.0.0.0:${PORT:-8080} dotnet FactCheckBack.API.dll"
