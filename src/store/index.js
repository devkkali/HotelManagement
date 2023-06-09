// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
// import user from 'src/store/apps/user'
import category from 'src/store/admin/category'
import adminRoom from 'src/store/admin/rooms'
import adminParking from 'src/store/admin/parkings'
import adminBooking from 'src/store/admin/bookings'
import userBooking from 'src/store/user/bookings'
import adminFinance from 'src/store/admin/finance'


export const store = configureStore({
  reducer: {
    category,
    adminRoom,
    adminParking,
    adminBooking,
    userBooking,
    adminFinance,
  },
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
