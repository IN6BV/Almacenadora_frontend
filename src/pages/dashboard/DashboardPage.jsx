import { FormAdd } from '../../components/FormAdd/FormAdd'
import { FormEdit } from '../../components/formEdit/FormEdit'
import { Navbar } from '../../components/navbar/Navbar'
import './dashboardPage.css'
export const DashboardPage = () => {
    return (
        <div>
            <Navbar/>
            <FormAdd/>
            <FormEdit/>
        </div>
    )
}