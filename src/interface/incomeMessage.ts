export default interface IncomeMessageT {
    sender_custom_id: string
    reciver_custom_id: string
    custom_id: string
    message: string
    time_stamp:string
    is_mentioned: boolean
    mentioned_person_custom_id: string
}