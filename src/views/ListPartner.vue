<template>
    <div class="conteiner"> 
        <div class="table-list=partner">
            <h2>Lista de Parceiros</h2>
            <Table :head="tableHeader" :route="'http://localhost:8080/partner/list'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Table from "../components/Table.vue";
const tableHeader = ["ID", "Código", "Empresa", "Nome do Admin", "Email do Admin", "Slogan", "País", "Cidade", "Endereço", "Conformidade", "Crédito", "Status", "Tipo de Membro", "Data de Início do Membro"];
</script>

<style scoped>

.conteiner{
    height: 1vh;
    width: auto;
    padding: 20px;
    padding-top: 10px;
}

</style>
