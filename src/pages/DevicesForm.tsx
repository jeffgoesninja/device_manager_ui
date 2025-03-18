import { memo, useCallback, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue
} from '@/components/ui/select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Device, DeviceType } from '@/types'
import { createDevice, updateDevice } from '@/lib/api'
import { toast } from 'sonner'

const formSchema = z.object({
  type: z.string().nonempty('Device type is required'),
  system_name: z.string().nonempty('System name is required'),
  hdd_capacity: z.string().nonempty('HDD capacity is required')
})

type DevicesFormProps = {
  isOpen: boolean
  onClose: () => void
  deviceId?: string | null
}

const defaultValues = { type: '', system_name: '', hdd_capacity: '' }

const DevicesForm = memo(({ isOpen, onClose, deviceId }: DevicesFormProps) => {
  const queryClient = useQueryClient()
  const device = queryClient
    .getQueryData<Device[]>(['devices'])
    ?.find((d) => d.id === deviceId)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const handleClose = useCallback(() => {
    onClose()
  }, [form, onClose])

  useEffect(() => {
    if (device)
      form.reset({
        type: device.type,
        system_name: device.system_name,
        hdd_capacity: device.hdd_capacity
      })
  }, [device, form])

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      deviceId ? updateDevice(deviceId, values) : createDevice(values),
    onMutate: async (values) => {
      // Edit or Add device
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync(values)
      toast.success(
        deviceId ? 'Device updated successfully!' : 'Device added successfully!'
      )
      handleClose()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deviceId ? 'Edit Device' : 'Add Device'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="system_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-muted-lavender"
                          placeholder="Select type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={DeviceType.WINDOWS}>
                        Windows workstation
                      </SelectItem>
                      <SelectItem value={DeviceType.LINUX}>
                        Linux workstation
                      </SelectItem>
                      <SelectItem value={DeviceType.MAC}>
                        Mac workstation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hdd_capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HDD capacity (GB) *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange()
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-8">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button isLoading={form.formState.isSubmitting} type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
})

DevicesForm.displayName = 'DevicesForm'

export { DevicesForm }
