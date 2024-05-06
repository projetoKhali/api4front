<template>
    <div class="container">
        <div class="table-list-partner">
            <h2>Lista de Usuários</h2>
            <button @click="() => addUser()"> Adicionar um novo usuario </button>
            <Table :headers="tableHeaders" :initialData="fullData" :pagination="pagination" />
        </div>
    </div>
    <Popup
        v-if="isPopupOpen"
        :TogglePopup="() => isPopupOpen  = !isPopupOpen"
    >
        <UserForm
        :formActionTitle="'Título do Formulário'"
        :user="user"
        :actions="actions"
    ></UserForm>
  </Popup>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Table from '../components/Table.vue';
import { UserPatchSchema, UserSchema, UserPostSchema } from '@/schemas/User';
import { useRoute } from 'vue-router';
import { createUser, updateUser } from '../service/UserService';
import Popup from '../components/Popup.vue';
import UserForm from '../components/form/UserForm.vue';

const tableHeaders = [
    "ID", "Email", "Nome", "Type", "Dashboard Individual", "Edição"
];

const fullData = ref<Array<[number, string, string, string, string, Function, Function]>>([]);
const itemsPerPage: number = 10;
const router = useRoute();
const isPopupOpen = ref(false);
const user = ref<UserSchema | UserPostSchema>();
const actions = ref<{salvar: (user: UserSchema) => void }>();

const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:8080/user/list");
        const data = await response.json();
        const formatted: Array<[number, string, string, string, string, Function, Function]> = data.content.map((item: UserSchema) => ([
            item.id,
            item.login,
            item.name,
            item.profileType,
            () => {
                goToDashboard(item.id);

            },
            () => {
             user.value = item;
             isPopupOpen.value = !isPopupOpen.value;
             console.log("Print", user)
             actions.value = {
                salvar: (_: UserSchema) => {
                    if (user.value === undefined) {
                        return
                    }
                    const {id, ...userData} = user.value;
                    updateUser(id, userData)
                    console.log('Valor user', user.value)
                }
             }
            }
        ]));
        fullData.value = formatted;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
    }
};

onMounted(fetchData);

const pagination = {
    getTotalPages: () => Math.ceil(fullData.value.length / itemsPerPage),
    getPageData: (pageIndex: number): Array<[number, string, string, string, string, Function, Function]> => {
        const startIndex = pageIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return fullData.value.slice(startIndex, endIndex);
    },
};

const goToDashboard = (userId: number) => {
    router.push(`/user/${userId}`);
};

const addUser = () => {
    const UserPost: UserPostSchema = {
        name: "",
        login: "",
        password: "",
        profileType: "PartnerAdmin",
    } 
    user.value = UserPost;
    isPopupOpen.value = !isPopupOpen.value;
    actions.value = {
        salvar: (_: UserSchema) => {
            if (user.value === undefined) {
                return
            }
            createUser(user.value)
            console.log('Valor user', user.value)
        }
    }
}

</script>

<style scoped>
.container {
    height: 100%;
    width: auto;
    padding: 20px;
    padding-top: 10px;
}

.table-list-partner {
    margin-top: 20px;
}
</style>
