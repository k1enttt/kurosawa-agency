'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
  backgroundColor: 'light' | 'dark' | undefined
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    backgroundColor,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className={backgroundColor == 'dark' ? 'bg-muted' : 'bg-white'}>
      <div className="container py-8 lg:py-16">
        {enableIntro && introContent && !hasSubmitted && (
          <RichText
            className="mb-8 lg:mb-12 flowbite-h2"
            data={introContent}
            enableGutter={false}
          />
        )}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form section: chiếm 3/4 chiều rộng */}
          <div className="w-full md:w-3/4">
            {/* FormProvider: quản lý logic và state của form */}
            <FormProvider {...formMethods}>
              {/* Hiển thị thông báo xác nhận sau khi gửi form */}
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText enableGutter={false} data={confirmationMessage} />
              )}
              {/* Hiển thị trạng thái loading khi đang gửi form */}
              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
              {/* Hiển thị lỗi nếu có */}
              {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
              {/* Form nhập liệu */}
              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4 last:mb-0 grid grid-cols-2 gap-x-4">
                    {/* Render từng trường của form */}
                    {formFromProps &&
                      formFromProps.fields &&
                      formFromProps.fields?.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fields?.[field.blockType as keyof typeof fields]
                        if (Field) {
                          return (
                            <div
                              className={cn(
                                'mb-6 last:mb-0',
                                field.blockType == 'textarea' && 'col-span-2',
                              )}
                              key={index}
                            >
                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                              />
                            </div>
                          )
                        }
                        return null
                      })}
                  </div>
                  {/* Nút gửi form */}
                  <Button
                    form={formID}
                    type="submit"
                    variant="default"
                    className="bg-secondary hover:bg-secondary/80 dark:bg-secondary-foreground dark:hover:bg-secondary-foreground/80 py-6 rounded-lg"
                  >
                    {submitButtonLabel}
                  </Button>
                </form>
              )}
            </FormProvider>
          </div>
          {/* Sidebar thông tin liên hệ: chiếm 1/4 chiều rộng */}
          <div className="w-full md:w-1/4">
            <div className="h-full flex flex-col justify-start items-center md:items-start">
              {/* Dòng Email */}
              <div className="flex md:flex-row flex-col items-center mb-8">
                {/* Ô vuông chứa icon Email */}
                <div className="w-14 h-14 flex items-center justify-center bg-secondary rounded-lg mr-0 md:mr-4 mb-4 md:mb-0">
                  {/* Icon: Email */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1221_1756)">
                      <path
                        d="M33.334 6.66669H6.66732C4.83398 6.66669 3.35065 8.16669 3.35065 10L3.33398 30C3.33398 31.8334 4.83398 33.3334 6.66732 33.3334H33.334C35.1673 33.3334 36.6673 31.8334 36.6673 30V10C36.6673 8.16669 35.1673 6.66669 33.334 6.66669ZM32.6673 13.75L20.884 21.1167C20.3507 21.45 19.6507 21.45 19.1173 21.1167L7.33398 13.75C6.91732 13.4834 6.66732 13.0334 6.66732 12.55C6.66732 11.4334 7.88398 10.7667 8.83398 11.35L20.0007 18.3334L31.1673 11.35C32.1173 10.7667 33.334 11.4334 33.334 12.55C33.334 13.0334 33.084 13.4834 32.6673 13.75Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1221_1756">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {/* Nội dung Email */}
                <div className="flex flex-col">
                  <span className="text-gray-900 text-[20px] font-semibold leading-[22px] md:text-left text-center">
                    Email
                  </span>
                  <span className="text-gray-700 text-base md:text-left text-center">
                    japan.desk@kurosawa.vn
                  </span>
                </div>
              </div>
              {/* Dòng Phone */}
              <div className="flex md:flex-row flex-col items-center mb-8">
                {/* Ô vuông chứa icon Phone */}
                <div className="w-14 h-14 flex items-center justify-center bg-secondary rounded-lg mr-0 md:mr-4 mb-4 md:mb-0">
                  {/* Icon: Phone */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1221_1761)">
                      <path
                        d="M32.0491 25.4333L27.8158 24.95C26.7991 24.8333 25.7991 25.1833 25.0824 25.9L22.0158 28.9667C17.2991 26.5667 13.4324 22.7167 11.0324 17.9833L14.1158 14.9C14.8324 14.1833 15.1824 13.1833 15.0658 12.1667L14.5824 7.96666C14.3824 6.28333 12.9658 5.01666 11.2658 5.01666H8.38243C6.49909 5.01666 4.93242 6.58333 5.04909 8.46666C5.93242 22.7 17.3158 34.0667 31.5324 34.95C33.4158 35.0667 34.9824 33.5 34.9824 31.6167V28.7333C34.9991 27.05 33.7324 25.6333 32.0491 25.4333Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1221_1761">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {/* Nội dung Phone */}
                <div className="flex flex-col">
                  <span className="text-gray-900 text-[20px] font-semibold leading-[22px] md:text-left text-center">
                    Phone
                  </span>
                  <span className="text-gray-700 text-base md:text-left text-center">
                    +84-90-1392-232
                  </span>
                </div>
              </div>
              {/* Dòng Work time */}
              <div className="flex md:flex-row flex-col items-center">
                {/* Ô vuông chứa icon Location */}
                <div className="w-14 h-14 flex items-center justify-center bg-secondary rounded-lg mr-0 md:mr-4 mb-4 md:mb-0">
                  {/* Icon: Location */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1221_1766)">
                      <path
                        d="M33.334 9.99998H26.6673V6.66665C26.6673 4.81665 25.184 3.33331 23.334 3.33331H16.6673C14.8173 3.33331 13.334 4.81665 13.334 6.66665V9.99998H6.66732C4.81732 9.99998 3.35065 11.4833 3.35065 13.3333L3.33398 31.6666C3.33398 33.5166 4.81732 35 6.66732 35H33.334C35.184 35 36.6673 33.5166 36.6673 31.6666V13.3333C36.6673 11.4833 35.184 9.99998 33.334 9.99998ZM23.334 9.99998H16.6673V6.66665H23.334V9.99998Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1221_1766">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {/* Nội dung Work time */}
                <div className="flex flex-col">
                  <span className="text-gray-900 text-[20px] font-semibold leading-[22px] md:text-left text-center">
                    Work time
                  </span>
                  <span className="text-gray-700 text-base md:text-left text-center">
                    Mon — Sat: 9AM — 6PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
