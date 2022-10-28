import UsersChartRow from './UsersChartRow';
import { useEffect, useState } from 'react'

function UsersChart() {

    const [users, setUsers] = useState([]);

    async function getUsers() {
        const allUsers = await fetch("https://ninetech.herokuapp.com/api/users/").then(res => res.json()).then(data => data.data)
        setUsers(allUsers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="50%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => {
                                return <UsersChartRow key={i} nombre={user.user.nombre} apellido={user.user.apellido} email={user.user.email} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UsersChart