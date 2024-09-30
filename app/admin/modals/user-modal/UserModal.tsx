"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { schema } from './schema'
import ModalLayout from '../../layout/ModalLayout'
import Input from '@/components/general/Input'
import Button from '@/components/general/Button'
import { getUserById, updateUser } from './service'

// Define types for props
interface UserModalProps {
    userId: string;
    handleHideModal: () => void;
}

// Define types for the form data
interface UserFormData {
    username: string;
    email: string;
}

const UserModal: React.FC<UserModalProps> = ({ userId, handleHideModal }) => {
    const queryClient = useQueryClient()

    const { data: user, isFetching } = useQuery({
        queryFn: () => getUserById(userId),
        queryKey: ["admin", "users", { userId }],
        onSuccess: (data) => {
            reset({ username: data.username, email: data.email }) // Reset form with user data
        }
    })

    const { mutate: handleUpdateUser, isPending: isPendingMutation } = useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: UserFormData }) => updateUser({ userId, data }),
        onSuccess: () => {
            toast.success("Successfully updated the user")
            queryClient.invalidateQueries({
                queryKey: ["admin", "users"]
            })
        }
    })

    const {
        register,
        handleSubmit,
        reset
    } = useForm<UserFormData>({
        resolver: zodResolver(schema)
    })

    // Reset the form when the user data is fetched
    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                email: user.email
            })
        }
    }, [user, reset])

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        handleUpdateUser({ userId, data })
        handleHideModal()
    }

    return (
        <ModalLayout
            document="User"
            handleHideModal={handleHideModal}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full px-4 py-6 flex flex-col items-center gap-8"
            >
                <Input
                    className="w-full px-2 py-3 rounded-xl"
                    type="text"
                    placeholder="john"
                    register={register("username")}
                />
                <Input
                    className="w-full px-2 py-3 rounded-xl"
                    type="email"
                    placeholder="john@gmail.com"
                    register={register("email")}
                />
                <Button
                    className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
                    disabled={isPendingMutation || isFetching}
                    label="Submit"
                />
            </form>
        </ModalLayout>
    )
}

export default UserModal
