// @ts-ignore
import { FormAdd } from '../../components/FormAdd/FormAdd.jsx'
import { Navbar } from '../../components/navbar/Navbar'
import './dashboardPage.css'
import { TaskList } from '../../components/taskList/TaskList.jsx'

export const DashboardPage = () => {
    return (
        <div>
            <Navbar/>
            <FormAdd/>
            <TaskList/>
        </div>
    )
}