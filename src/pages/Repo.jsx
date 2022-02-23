import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"

export default function Repo() {
    const params = useParams()
    const currentRepository = params["*"]

    const queryClient = useQueryClient()

    const invalideQueries = async () => {
        //Essa função remove invalida o tempo de reposData, ou seja, ao clicar e voltar para lista de repositórios, ele irá fazer uma nova chamada na api.
        await queryClient.invalidateQueries(["reposData"])
    }
    const handleChangeRepositoryDescription = async () => {
        // Pegamos tudo que tem em cache.
        const previousRepos = queryClient.getQueryData()

        // Filtramos pelo nome o repositorio que queremos e alteramos a descrição.
        const newRepos = previousRepos.map(repo => (repo.name === currentRepository ? { ...repo, description: "alterando" } : repo))

        // Depois atualizamos o cache. Vale ressaltar que é apenas o cache, a informação real sempre vem da api, não estamos alterando o banco.
        queryClient.setQueryData("reposData", newRepos)
    }

    return (
        <div style={{ backgroundColor: "#333", height: "100vh" }}>
            <span style={{ color: "white", fontSize: 50, marginLeft: 5 }}>{currentRepository}</span>
            <button style={{ marginLeft: 10 }} onClick={invalideQueries}>
                Invalide query, refetch
            </button>
            <button style={{ marginLeft: 10 }} onClick={handleChangeRepositoryDescription}>
                change description
            </button>
        </div>
    )
}
