import { defineStore } from 'pinia'
import { budgets as mockBudgets } from '../mock/data'

export const useBudgetsStore = defineStore('budgets', {
  state: () => ({ budgets: mockBudgets }),
  actions: {
    updateStatus(id, status) {
      const b = this.budgets.find(x => x.id === id)
      if (b) b.status = status
    }
  }
})
