<x-app-layout>
  <x-slot name="header">
      <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {{ __('Manage Events') }}
      </h2>
  </x-slot>

  <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div class="p-6 text-gray-900 dark:text-gray-100">
                  @if ($pendingEvents->isEmpty())
                      <p>{{ __("No pending events to approve.") }}</p>
                  @else
                      <table class="table">
                          <thead>
                              <tr>
                                  <th>{{ __('Title') }}</th>
                                  <th>{{ __('Host ID') }}</th>
                                  <th>{{ __('Action') }}</th>
                              </tr>
                          </thead>
                          <tbody>
                              @foreach ($pendingEvents as $event)
                                  <tr>
                                      <td>{{ $event->title }}</td>
                                      <td>{{ $event->host_id }}</td>
                                      <td>
                                          <form action="{{ route('admin.events.approve', $event->id) }}" method="POST">
                                              @csrf
                                              <button type="submit" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{{ __('Approve') }}</button>
                                          </form>
                                      </td>
                                  </tr>
                              @endforeach
                          </tbody>
                      </table>
                  @endif
              </div>
          </div>
      </div>
  </div>
</x-app-layout>
