export function getDisplayName(key: string): string {
  switch (key) {
    case 'id':
      return 'ID';

    // User fields
    case 'name':
      return 'Nome';
    case 'password':
      return 'Senha';
    case 'profileType':
      return 'Perfil';

    // Partner fields
    case 'companyId':
      return 'Código';
    case 'adminName':
      return 'Nome do administrador';
    case 'adminEmail':
      return 'Email do administrador';
    case 'country':
      return 'País';
    case 'city':
      return 'Cidade';
    case 'address':
      return 'Endereço';
    case 'compliance':
      return 'Conformidade';
    case 'credit':
      return 'Crédito';
    case 'status':
      return 'Status';
    case 'memberType':
      return 'Tipo de Membro';

    // Other
    case 'cancel':
      return 'Cancelar';

    // fallback to capitalize first letter
    default:
      return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
