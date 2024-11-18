<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {ApiResponse} from "./types.ts";
import {api} from "./api";
import Spinner from "./components/Spinner.vue";
import UserCard from "./components/UserCard.vue";

/**
 * A reactive reference that stores the user data fetched from the API.
 * Initially set to `null` and updated with `ApiResponse` data when available.
 *
 * @type {import('vue').Ref<ApiResponse | null>}
 */
const users = ref<ApiResponse | null>(null);

/**
 * A reactive reference that indicates the loading state of data.
 * `true` when an API request is in progress, `false` otherwise.
 *
 * @type {import('vue').Ref<boolean>}
 */
const pending = ref(false);

/**
 * Loads more user data when the user scrolls to the bottom of a container.
 *
 * @async
 * @param {Event} event - The scroll event.
 * @returns {Promise<void>} - Resolves when new data is loaded.
 *
 * @description
 * Triggers an API call to fetch the next page of users if the bottom of the container is reached.
 * Prevents multiple requests with a `pending` flag.
 */
const onScroll = async (event: Event) => {

  if (pending.value) return

  const target = event.target as HTMLDivElement;
  const height = +(target.scrollHeight - target.scrollTop).toFixed()

  if ([height, height + 1, height - 1].includes(event.target.clientHeight)) {
    pending.value = true
    try {
      const data = await api.getUsers(users.value.info.page + 1)
      users.value.results.push(...data.results)
      users.value.info.page++
    } finally {
      pending.value = false
    }
  }

}


/**
 * Fetches initial user data when the component is mounted.
 *
 * @returns {void}
 *
 * @description
 * When the component is mounted, an API request is made to fetch the initial set of users.
 * The fetched data is then stored in the `users` reactive reference.
 */
onMounted(() => {
  api.getUsers().then((data) => {
    users.value = data
  })
})

</script>

<template>
  <div class="flex justify-center items-center h-[500px]">
    <div class="flex flex-col gap-3">
      <h3 class="font-bold text-3xl">Infinite Scroll</h3>
      <div
          @scroll="onScroll"
          class="flex flex-col border border-gray-200 gap-3 shadow-2xl rounded p-3 w-[400px] h-[300px] overflow-y-auto"
      >
        <template v-if="users">
          <UserCard
              v-for="user of users.results"
              :key="user.ud"
              :fullName="`${user.name.first} ${user.name.last}`"
              :media="user.picture.medium"
              :email="user.email"
          />
          <div v-if="pending" class="flex justify-center">
            <Spinner/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>