import { getAllUsers } from '@/app/_actions/_userActions'
import { UsersTable } from '@/components/auth/usersTable/usersDataTable'
import { usersTableColumns } from '@/components/auth/usersTable/usersTableColumns'
import React from 'react'

const UsersPage = async () => {
    const columns = usersTableColumns
    const data = await getAllUsers()

    return (
        <div>
            <UsersTable columns={columns} data={data} />
        </div>
    )
}

export default UsersPage