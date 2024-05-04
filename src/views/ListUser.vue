<template>
    <div class="conteiner"> 
        <div class="table-qualify">
            <h2>Tabela de Qualificadores</h2>
            <Table :head="tableHeader" :route="'http://localhost:8080/user/list'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Table from "../components/Table.vue";
const tableHeader = ["id", "Email", "Nome", "Senha", "Type"];
</script>

<style scoped>


.conteiner{
    height: auto;
    width: auto;
    padding: 20px;
    padding-top: 10px;
}

</style>
