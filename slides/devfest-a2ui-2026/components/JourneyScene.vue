<script setup lang="ts">
import { computed } from 'vue'

const { stage } = defineProps<{ stage: number }>()

const chapters = [
  {
    title: 'Which flight would you pick?',
    steps: [
      ['Traveller', 'Fly Nairobi to Mombasa on Friday for under KES 8,000.'],
      ['Agent', 'JM-204 leaves at 08:10 for KES 7,400. KQ-312 leaves at 11:40 for KES 7,850. SF-106 leaves at 16:20 for KES 8,250. Which flight?'],
    ],
  },
  {
    title: 'A window seat',
    steps: [
      ['Traveller', 'I’d like a window seat.'],
      ['Agent', 'In row 12, A, C, E, and F are available. B and D are taken. A and F are window seats. Which one?'],
      ['Traveller', '12A.'],
    ],
  },
  {
    title: 'Passenger details',
    steps: [
      ['Agent', 'Send your first name, last name, email, and passport number.'],
      ['Traveller', 'Alex Demo, alxe@example.com, DEMO0001.'],
      ['Traveller', 'The email is alex@example.com. Please keep the other details.'],
    ],
  },
  {
    title: 'The total before you pay',
    steps: [
      ['Agent', 'You chose JM-204 from Nairobi to Mombasa, seat 12A. The total is KES 7,400. Open checkout to continue.'],
      ['Traveller', 'Let me check the seat and the price.'],
    ],
  },
  {
    title: 'Your booking reference',
    steps: [
      ['Agent', 'You’re booked on JM-204 from Nairobi to Mombasa at 08:10. Your reference is DEMO-740. Your seat is 12A and you paid KES 7,400.'],
    ],
  },
]

const labels = ['Flights', 'Seat', 'Traveller', 'Payment', 'Receipt']
const flights = [
  { code: 'JM-204', time: '08:10', price: '7,400', hint: 'Lowest fare' },
  { code: 'KQ-312', time: '11:40', price: '7,850', hint: 'Within budget' },
  { code: 'SF-106', time: '16:20', price: '8,250', hint: 'Over budget' },
]
const seatRows = [
  ['10A', '10B', '10C', '10D', '10E', '10F'],
  ['11A', '11B', '11C', '11D', '11E', '11F'],
  ['12A', '12B', '12C', '12D', '12E', '12F'],
]
const occupied = new Set(['10A', '11C', '12B', '12D'])
const details = [
  ['First name', 'Alex'],
  ['Last name', 'Demo'],
  ['Email', 'alex@example.com'],
  ['Passport number', 'DEMO0001'],
]
const chapter = computed(() => chapters[stage - 1])
</script>

<template>
  <div class="journey">
    <h1>{{ chapter.title }}</h1>
    <ol class="journey-steps" aria-label="Booking progress">
      <li v-for="(label, index) in labels" :key="label" :class="{ current: stage === index + 1 }"
          :aria-current="stage === index + 1 ? 'step' : undefined">
        {{ label }}
      </li>
    </ol>
    <div class="journey-pair">
      <div class="journey-column">
        <h2>Chat only</h2>
        <div class="conversation" aria-label="Illustrated chat transcript">
          <div v-for="([speaker, message], index) in chapter.steps" :key="index" class="bubble"
               :class="{ traveller: speaker === 'Traveller' }">
            <strong>{{ speaker }}</strong>
            <p>{{ message }}</p>
          </div>
        </div>
      </div>
      <div v-click="stage === 1 && 1" class="journey-column journey-interface">
        <h2>With A2UI <span class="illustration-label">Illustration</span></h2>
        <div class="journey-panel" aria-label="Illustrated booking interface">
          <template v-if="stage === 1">
            <div class="journey-panel-title">Nairobi to Mombasa</div>
            <div class="journey-muted">Friday, 27 Nov · Budget KES 8,000</div>
            <div v-for="(flight, index) in flights" :key="flight.code" class="journey-flight"
                 :class="{ 'chosen-flight': index === 0 }">
              <div><strong>{{ flight.code }}</strong><span>{{ flight.time }} departure</span></div>
              <div class="fare"><strong>KES {{ flight.price }}</strong><span>{{ flight.hint }}</span></div>
            </div>
          </template>
          <template v-else-if="stage === 2">
            <div class="journey-panel-title">JM-204 seat map</div>
            <div class="seat-headings"><span>Window</span><span>Aisle</span><span>Window</span></div>
            <div class="seat-rows">
              <div v-for="row in seatRows" :key="row[0]" class="seat-row">
                <span v-for="seat in row" :key="seat" class="seat"
                      :class="{ 'seat-taken': occupied.has(seat), 'seat-selected': seat === '12A' }"
                      :aria-label="seat + (occupied.has(seat) ? ' occupied' : seat === '12A' ? ' selected' : ' available')">
                  {{ occupied.has(seat) ? '×' : seat === '12A' ? '✓ ' + seat : seat }}
                </span>
              </div>
            </div>
            <div class="journey-action"><span>× Occupied · ✓ Selected</span><strong>Confirm 12A</strong></div>
          </template>
          <template v-else-if="stage === 3">
            <div class="journey-panel-title">Passenger details</div>
            <div class="journey-muted">JM-204 · Seat 12A</div>
            <div class="journey-fields">
              <div v-for="[label, value] in details" :key="label">
                <strong>{{ label }}</strong><span>{{ value }}</span>
              </div>
            </div>
            <div class="journey-action"><span>4 required fields filled</span><strong>Continue</strong></div>
          </template>
          <template v-else-if="stage === 4">
            <div class="journey-panel-title">Your trip</div>
            <dl class="journey-summary">
              <div><dt>Route</dt><dd>Nairobi to Mombasa</dd></div>
              <div><dt>Flight</dt><dd>JM-204 at 08:10</dd></div>
              <div><dt>Seat</dt><dd>12A</dd></div>
              <div class="summary-total"><dt>Total</dt><dd>KES 7,400</dd></div>
            </dl>
            <div class="journey-action"><span>Simulated checkout</span><strong>Pay KES 7,400</strong></div>
          </template>
          <template v-else>
            <div class="journey-panel-title">Booking confirmed</div>
            <div class="booking-reference"><span>Booking reference</span><strong>DEMO-740</strong></div>
            <dl class="journey-summary receipt-summary">
              <div><dt>Flight</dt><dd>JM-204 at 08:10</dd></div>
              <div><dt>Seat</dt><dd>12A</dd></div>
              <div><dt>Amount paid</dt><dd>KES 7,400</dd></div>
            </dl>
            <div class="journey-muted">Simulated booking · Nairobi to Mombasa</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
