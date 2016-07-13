if exist "src\Glimpse.Agent.AspNet\_DNX_project.json" (
    echo "Switching to DNX project.json"

    echo "src\Glimpse.Agent.AspNet"
    ren "src\Glimpse.Agent.AspNet\project.*" "_SystemWeb_project.*"
    ren "src\Glimpse.Agent.AspNet\_DNX_project.*" "project.*"

    echo "src\Glimpse.Server"
    ren "src\Glimpse.Server\project.*" "_SystemWeb_project.*"
    ren "src\Glimpse.Server\_DNX_project.*" "project.*"

    echo "src\Glimpse.Common"
    ren "src\Glimpse.Common\project.*" "_SystemWeb_project.*"
    ren "src\Glimpse.Common\_DNX_project.*" "project.*"
) else (
    echo "Switching to SystemWeb project.json"

    echo "src\Glimpse.Agent.AspNet"
    ren "src\Glimpse.Agent.AspNet\project.*" "_DNX_project.*"
    ren "src\Glimpse.Agent.AspNet\_SystemWeb_project.*" "project.*"

    echo "src\Glimpse.Server"
    ren "src\Glimpse.Server\project.*" "_DNX_project.*"
    ren "src\Glimpse.Server\_SystemWeb_project.*" "project.*"

    echo "src\Glimpse.Common"
    ren "src\Glimpse.Common\project.*" "_DNX_project.*"
    ren "src\Glimpse.Common\_SystemWeb_project.*" "project.*"
)