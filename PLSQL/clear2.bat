@echo off
echo Deleting *.~sql files in the current directory and subdirectories...
for /r %%i in (*.~sql) do (
    echo Deleting %%i
    del "%%i"
)
echo Done.
pause
