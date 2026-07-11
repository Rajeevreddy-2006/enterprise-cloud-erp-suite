import api from "./api";

class DocumentService {
    async employeeDocuments(employeeId:string){
        const res =
            await api.get(
                `/documents/employee/${employeeId}`
            );
        return res.data;
    }

    async upload({

        file,

        category,

        employeeId

    }: {

        file: File;

        category: string;

        employeeId: string;

    }) {

        const formData =
            new FormData();

        formData.append(

            "file",

            file

        );

        formData.append(

            "category",

            category

        );

        formData.append(

            "employeeId",

            employeeId

        );

        const res =

            await api.post(

                "/documents/upload",

                formData,

                {

                    headers: {

                        "Content-Type":

                            "multipart/form-data"

                    }

                }

            );

        return res.data;

    }

    async create(data:any){
        const res =
            await api.post(
                "/documents",
                data
            );
        return res.data;
    }

    async delete(id:string){
        const res =
            await api.delete(
                `/documents/${id}`
            );
        return res.data;
    }

    async downloadDocument(
        id: string,
        fileName: string
    ) {
        const res = await api.get(
            `/documents/${id}/download`,
            {
                responseType: "blob"
            }
        );
        const url = window.URL.createObjectURL(
            new Blob([res.data])
        );
        const link = document.createElement(
            "a"
        );
        link.href = url;
        link.download = fileName;
        document.body.appendChild(
            link
        );
        link.click();
        link.remove();
        window.URL.revokeObjectURL(
            url
        );
    }

}

export default new DocumentService();