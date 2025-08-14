import { scheduleCron } from "../utils/cron.js";
import {User} from "../schemas/userSchema.js";

export const startCleanup = () => {
  scheduleCron('0 0 * * *', async () => {
    console.log('cron job cleaning unverified users')  
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 *1000)   
  try {
    const unverifiedUsers = await User.deleteMany({
      verified: false,
      createdAt: {$lt: last24Hours}
    })
    console.log(`deleted ${unverifiedUsers.deletedCount} unverified users`)
  } catch (error) {
    console.log(error)
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  })
}
