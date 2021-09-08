const logger = require("pino-pretty")
import dayjs from 'dayjs'

export const log = logger({
    prettyPrint: true,
    base: {
        pid: false 
    },
    timestamp: () => `"time": "${dayjs().format()}"`
})