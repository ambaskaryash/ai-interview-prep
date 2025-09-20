"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { experienceLevels, JobInfoTable } from "@/drizzle/schema/jobInfo"
import { 
  VStack, 
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Button,
  Box
} from '@chakra-ui/react'
import { jobInfoSchema } from "../schemas"
import { formatExperienceLevel } from "../lib/formatters"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { createJobInfo, updateJobInfo } from "../actions"
import { toast } from "sonner"

type JobInfoFormData = z.infer<typeof jobInfoSchema>

export function JobInfoForm({
  jobInfo,
}: {
  jobInfo?: Pick<
    typeof JobInfoTable.$inferSelect,
    "id" | "name" | "title" | "description" | "experienceLevel"
  >
}) {
  const form = useForm<JobInfoFormData>({
    resolver: zodResolver(jobInfoSchema),
    defaultValues: jobInfo ?? {
      name: "",
      title: null,
      description: "",
      experienceLevel: "junior",
    },
  })

  async function onSubmit(values: JobInfoFormData) {
    const action = jobInfo
      ? updateJobInfo.bind(null, jobInfo.id)
      : createJobInfo
    const res = await action(values)

    if (res.error) {
      toast.error(res.message)
    }
  }

  return (
    <Box as="form" onSubmit={form.handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <FormControl isInvalid={!!form.formState.errors.name}>
          <FormLabel>Name</FormLabel>
          <Input 
            {...form.register("name")}
            placeholder="e.g., Frontend Developer Position"
          />
          <FormHelperText>
            This name is displayed in the UI for easy identification.
          </FormHelperText>
          {form.formState.errors.name && (
            <FormErrorMessage>
              {form.formState.errors.name.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <FormControl isInvalid={!!form.formState.errors.title}>
            <FormLabel>Job Title</FormLabel>
            <Controller
              name="title"
              control={form.control}
              render={({ field }) => (
                <Input 
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  placeholder="e.g., Senior Frontend Developer"
                />
              )}
            />
            <FormHelperText>
              Optional. Only enter if there is a specific job title you are
              applying for.
            </FormHelperText>
            {form.formState.errors.title && (
              <FormErrorMessage>
                {form.formState.errors.title.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!form.formState.errors.experienceLevel}>
            <FormLabel>Experience Level</FormLabel>
            <Controller
              name="experienceLevel"
              control={form.control}
              render={({ field }) => (
                <Select 
                  {...field}
                  placeholder="Select experience level"
                >
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>
                      {formatExperienceLevel(level)}
                    </option>
                  ))}
                </Select>
              )}
            />
            {form.formState.errors.experienceLevel && (
              <FormErrorMessage>
                {form.formState.errors.experienceLevel.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={!!form.formState.errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            {...form.register("description")}
            placeholder="A Next.js 15 and React 19 full stack web developer job that uses Drizzle ORM and Postgres for database management."
            rows={6}
            resize="vertical"
          />
          <FormHelperText>
            Be as specific as possible. The more information you provide,
            the better the interviews will be.
          </FormHelperText>
          {form.formState.errors.description && (
            <FormErrorMessage>
              {form.formState.errors.description.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <Button
          isDisabled={form.formState.isSubmitting}
          type="submit"
          w="full"
          colorScheme="brand"
          size="lg"
        >
          <LoadingSwap isLoading={form.formState.isSubmitting}>
            {jobInfo ? "Update Job Information" : "Save Job Information"}
          </LoadingSwap>
        </Button>
      </VStack>
    </Box>
  )
}
