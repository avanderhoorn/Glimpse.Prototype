@echo off

del /Q /S dist
del /Q /S src\Glimpse.Common\bin\Release
del /Q /S src\Glimpse.Server\bin\Release
del /Q /S src\Glimpse.Agent.AspNet\bin\Release
del /Q /S src\Glimpse.Agent.AspNet.Mvc\bin\Release

md dist

REM get time
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set DATE=%%c%%a%%b)
For /f "tokens=1-2 delims=/: " %%a in ("%TIME%") do (set TIME=%%a%%b)

set MILESTONE=beta2-%DATE%%TIME%

call dotnet restore .\src\Glimpse.Common\Glimpse.Common.csproj /p:VersionSuffix=%MILESTONE%
call dotnet restore .\src\Glimpse.Server\Glimpse.Server.csproj /p:VersionSuffix=%MILESTONE%
call dotnet restore .\src\Glimpse.Agent.AspNet\Glimpse.Agent.AspNet.csproj /p:VersionSuffix=%MILESTONE%
call dotnet restore .\src\Glimpse.Agent.AspNet.Mvc\Glimpse.Agent.AspNet.Mvc.csproj /p:VersionSuffix=%MILESTONE%

call dotnet pack .\src\Glimpse.Common\Glimpse.Common.csproj --configuration Release --version-suffix %MILESTONE%
call dotnet pack .\src\Glimpse.Server\Glimpse.Server.csproj --configuration Release --version-suffix %MILESTONE%
call dotnet pack .\src\Glimpse.Agent.AspNet\Glimpse.Agent.AspNet.csproj --configuration Release --version-suffix %MILESTONE%
call dotnet pack .\src\Glimpse.Agent.AspNet.Mvc\Glimpse.Agent.AspNet.Mvc.csproj --configuration Release --version-suffix %MILESTONE%

call nuget pack src\Glimpse\Glimpse.nuspec -OutputDirectory dist -version 2.0.0-%MILESTONE%

copy /Y src\Glimpse.Common\bin\Release\*.nupkg dist
copy /Y src\Glimpse.Server\bin\Release\*.nupkg dist
copy /Y src\Glimpse.Agent.AspNet\bin\Release\*.nupkg dist
copy /Y src\Glimpse.Agent.AspNet.Mvc\bin\Release\*.nupkg dist