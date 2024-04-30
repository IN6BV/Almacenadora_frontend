import { FormAdd } from '../../components/formAdd/FormAdd.jsx'
import { Navbar } from '../../components/navbar/Navbar'
import { useEffect } from 'react'
import './dashboardPage.css'
export const DashboardPage = () => {
    return (
        <div>
            <Navbar/>
            <FormAdd/>
        </div>
    )
}