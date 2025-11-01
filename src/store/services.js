import { defineStore } from 'pinia';

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [
      { id: 1, name: 'Casamentos', description: 'Planejamento completo para o seu dia especial.', icon: 'pi pi-heart' },
      { id: 2, name: 'Eventos Corporativos', description: 'Conferências, workshops e lançamentos de produtos.', icon: 'pi pi-briefcase' },
      { id: 3, name: 'Festas de Aniversário', description: 'Celebre com estilo e sem preocupações.', icon: 'pi pi-users' },
      { id: 4, name: 'Formaturas', description: 'Organização impecável para sua celebração.', icon: 'pi pi-graduation-cap' },
      { id: 5, name: 'Shows e Festivais', description: 'Produção de eventos musicais de grande porte.', icon: 'pi pi-music' },
      { id: 6, name: 'Eventos Sociais', description: 'Qualquer celebração que você imaginar.', icon: 'pi pi-star' }
    ]
  })
});
