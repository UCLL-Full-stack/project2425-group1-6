import { User } from "@/types";

type Props ={
    users: Array<User>;
}

const UserOverviewTable: React.FC<Props> = ({users}: Props) =>{
    return(
        <div className="flex flex-wrap gap-4">
            {users &&
                users.map((user, index) => (
                    <div
                        key={index}
                        className="w-64 border border-gray-300 rounded-lg shadow-lg p-4 bg-white cursor-pointer"
                    >
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-xl mt-2">Email: {user.email}</p>
                        <p className="text-xl mt-2">Phone Number: {user.phoneNumber}</p>
                    </div>
                ))}
        </div>
    )
}

export default UserOverviewTable;