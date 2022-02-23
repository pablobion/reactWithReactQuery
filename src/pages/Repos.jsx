import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

function App() {
    const { isLoading, error, data } = useQuery(
        "reposData",
        async () => {
            /*
      Primeiro parametro do useQuery não é a rota, é a chave de chache, uma maneira de identificar essa requisição unicamente, como se fosse um ID.
    */
            const response = await (await fetch("https://api.github.com/users/pablobion/repos")).json()

            return response
        },
        {
            staleTime: 1000 * 20, //Tempo que leva para ele dar um refetch.
        }
    )

    if (isLoading) return <h1>sss</h1>
    if (error) return <h1>Houve ume erro</h1>

    return (
        <div style={{ backgroundColor: "#333" }}>
            <span style={{ color: "white", fontSize: 50, marginLeft: 5 }}>Repos</span>
            {data?.map(elem => (
                <div style={{ border: "1px solid gray", padding: 5, margin: 10, borderRadius: 10 }}>
                    <Link style={{ textDecoration: "none", color: "white" }} to={`repo/${elem.name}`} key={elem.name} className="repo-div">
                        <h3 style={{ margin: 0 }}>{elem.name}</h3>
                        <p style={{ margin: 10 }}>{elem.description ? elem.description : "sem descrição"}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default App
