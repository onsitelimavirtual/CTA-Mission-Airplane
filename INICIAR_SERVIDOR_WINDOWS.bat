@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
 echo Node.js nao foi encontrado. Instale uma versao suportada e execute este arquivo novamente.
 pause
 exit /b 1
)
echo CTA Mission Airplane - servidor online local na porta 8080
echo Para abrir no mesmo computador: http://localhost:8080
echo Mantenha esta janela aberta enquanto jogar em rede.
node server.js
pause
