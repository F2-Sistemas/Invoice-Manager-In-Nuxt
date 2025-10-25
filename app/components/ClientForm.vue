<script setup lang="ts">
const props = defineProps<{
  client?: any
}>()

const emit = defineEmits(['saved', 'cancel'])

const form = reactive({
  name: props.client?.name || '',
  address: props.client?.address || '',
  city: props.client?.city || '',
  state: props.client?.state || '',
  zipCode: props.client?.zipCode || '',
  country: props.client?.country || '',
  email: props.client?.email || '',
  phone: props.client?.phone || '',
})

const loading = ref(false)
const error = ref('')

const save = async () => {
  loading.value = true
  error.value = ''

  try {
    if (props.client) {
      await $fetch(`/api/clients/${props.client.id}`, {
        method: 'PUT',
        body: form,
      })
    } else {
      await $fetch('/api/clients', {
        method: 'POST',
        body: form,
      })
    }

    emit('saved')
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to save client'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="save" class="space-y-4">
    <UFormGroup label="Name" required>
      <UInput v-model="form.name" placeholder="Client name" />
    </UFormGroup>

    <UFormGroup label="Address" required>
      <UInput v-model="form.address" placeholder="Street address" />
    </UFormGroup>

    <div class="grid grid-cols-2 gap-4">
      <UFormGroup label="City">
        <UInput v-model="form.city" placeholder="City" />
      </UFormGroup>

      <UFormGroup label="State">
        <UInput v-model="form.state" placeholder="State" />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <UFormGroup label="ZIP Code">
        <UInput v-model="form.zipCode" placeholder="ZIP Code" />
      </UFormGroup>

      <UFormGroup label="Country" required>
        <UInput v-model="form.country" placeholder="Country" />
      </UFormGroup>
    </div>

    <UFormGroup label="Email">
      <UInput v-model="form.email" type="email" placeholder="email@example.com" />
    </UFormGroup>

    <UFormGroup label="Phone">
      <UInput v-model="form.phone" placeholder="Phone number" />
    </UFormGroup>

    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      :title="error"
    />

    <div class="flex gap-2 justify-end">
      <UButton
        type="button"
        variant="ghost"
        @click="emit('cancel')"
      >
        Cancel
      </UButton>
      <UButton
        type="submit"
        :loading="loading"
        :disabled="!form.name || !form.address || !form.country"
      >
        {{ client ? 'Update' : 'Create' }}
      </UButton>
    </div>
  </form>
</template>
