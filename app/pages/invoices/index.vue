<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const filters = reactive({
  clientId: '',
  status: '',
  dateFrom: '',
  dateTo: '',
})

const { data: invoices, refresh } = await useFetch('/api/invoices', {
  query: filters,
})

const { data: clients } = await useFetch('/api/clients')

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'yellow',
    paid: 'green',
    overdue: 'red',
    cancelled: 'gray',
  }
  return colors[status] || 'gray'
}

const clientOptions = computed(() => [
  { label: 'All Clients', value: '' },
  ...(clients.value || []).map((c: any) => ({ label: c.name, value: c.id.toString() }))
])

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Cancelled', value: 'cancelled' },
]

const deleteInvoice = async (id: number) => {
  if (!confirm('Are you sure you want to delete this invoice?')) return

  try {
    await $fetch(`/api/invoices/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (error: any) {
    alert(error.data?.message || 'Failed to delete invoice')
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        <p class="text-gray-500 mt-2">Manage your invoices</p>
      </div>
      <UButton icon="i-heroicons-plus" to="/invoices/new">
        New Invoice
      </UButton>
    </div>

    <UCard class="mb-6">
      <template #header>
        <h3 class="font-semibold">Filters</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <UFormGroup label="Client">
          <USelect v-model="filters.clientId" :options="clientOptions" />
        </UFormGroup>

        <UFormGroup label="Status">
          <USelect v-model="filters.status" :options="statusOptions" />
        </UFormGroup>

        <UFormGroup label="From Date">
          <UInput v-model="filters.dateFrom" type="date" />
        </UFormGroup>

        <UFormGroup label="To Date">
          <UInput v-model="filters.dateTo" type="date" />
        </UFormGroup>
      </div>
    </UCard>

    <UCard>
      <UTable
        :rows="invoices || []"
        :columns="[
          { key: 'id', label: 'Invoice #' },
          { key: 'client.name', label: 'Client' },
          { key: 'total', label: 'Amount' },
          { key: 'status', label: 'Status' },
          { key: 'issueDate', label: 'Issue Date' },
          { key: 'dueDate', label: 'Due Date' },
          { key: 'actions', label: '' },
        ]"
      >
        <template #id-data="{ row }">
          <NuxtLink
            :to="`/invoices/${row.id}`"
            class="font-mono text-primary-500 hover:underline"
          >
            C{{ row.clientId }}-{{ row.sequentialNumber }}
          </NuxtLink>
        </template>

        <template #total-data="{ row }">
          {{ formatCurrency(Number(row.total)) }}
        </template>

        <template #status-data="{ row }">
          <UBadge :color="getStatusColor(row.status)" variant="soft">
            {{ row.status }}
          </UBadge>
        </template>

        <template #issueDate-data="{ row }">
          {{ formatDate(row.issueDate) }}
        </template>

        <template #dueDate-data="{ row }">
          {{ formatDate(row.dueDate) }}
        </template>

        <template #actions-data="{ row }">
          <div class="flex gap-2 justify-end">
            <UButton
              icon="i-heroicons-eye"
              variant="ghost"
              size="sm"
              :to="`/invoices/${row.id}`"
            />
            <UButton
              icon="i-heroicons-trash"
              variant="ghost"
              size="sm"
              color="red"
              @click="deleteInvoice(row.id)"
            />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
