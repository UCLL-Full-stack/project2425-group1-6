
import Image from "next/image"
import styles from "@styles/home.module.css"
import Header from "@/components/header"
import Head from "next/head"
import { useEffect, useState } from "react"
import { User } from "@/types"
import UserOverviewTable from "@/components/user/userOverviewTable"
import { UserService } from "@/services/UserService"


const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = async () =>{
    const response = await UserService.getAllUsers()
    const users = await response.json()
    setUsers(users)
  }

  useEffect(() =>{
    getUsers()
  }, [])
  return (
    <>
      <Head>
        <title>Demo Project</title>
        <meta name="description" content="Exam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="bg-[url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bmw-m.com%2Fen%2Ffastlane%2Fbmw-individual.html&psig=AOvVaw1vkCW0PTP4e2HzOuVL2-k-&ust=1731792219598000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiGvPWi34kDFQAAAAAdAAAAABAE')]">
        <span className="flex flex-row justify-center items-center">
          {/* <h1 className="text-2xl flex justify center mt-10">Welcome to our homepage</h1> */}
          <section>
            <UserOverviewTable users={users} />
          </section>
        </span>

      </main>
    </>
  )
}

export default Home

