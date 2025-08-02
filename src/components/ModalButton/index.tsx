/**
 * ModalButton Component
 * ---------------------
 * Component này dùng để hiển thị một nút (hoặc bất kỳ phần tử con nào) mà khi click vào sẽ mở một modal (hộp thoại) hiển thị thông tin chi tiết về một thành viên trong team.
 *
 * Props:
 * - children: ReactNode - Nội dung sẽ được render bên trong nút (thường là avatar, tên, v.v.).
 * - className: string - Các class CSS bổ sung cho nút.
 * - data: TeamBlockProps['members'][number] - Dữ liệu thành viên (bao gồm avatar, tên, vai trò, mô tả, ...).
 *
 * Khi click vào nút, modal sẽ hiện ra với thông tin chi tiết của thành viên, sử dụng Flowbite để xử lý logic hiển thị/ẩn modal.
 *
 * Lưu ý: Đảm bảo Flowbite đã được khởi tạo để modal hoạt động đúng.
 */

'use client'

import React, { useEffect } from 'react'
import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import { Media } from '../Media'
import RichText from '../RichText'
import { initFlowbite } from 'flowbite'

const ModalButton = ({
  children,
  className,
  data,
}: {
  children: React.ReactNode
  className: string
  data: Exclude<TeamBlockProps['members'], null | undefined>[number]
}) => {
  const { avatar, name: authorName, role: authorRole, description, background } = data

  useEffect(() => {
    // Dòng này để đảm bảo code js của Flowbite luôn hoạt động
    initFlowbite()
  })

  return (
    <>
      {/* Modal toggle */}
      <button
        data-modal-target={`default-modal-${data.id}`}
        data-modal-toggle={`default-modal-${data.id}`}
        className={className}
        type="button"
      >
        {children}
      </button>

      {/* Main modal */}
      <div
        id={`default-modal-${data.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-3xl max-h-full">
          {/* Modal content */}
          <div className="relative rounded-tl-lg rounded-tr-2xl rounded-br-lg rounded-bl-lg overflow-hidden shadow-sm bg-linear-to-br from-gray-50 via-white to-gray-100">
            {/* Nút đóng */}
            <button
              data-modal-hide={`default-modal-${data.id}`}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-primary hover:bg-primary/80 rounded-md z-52"
              aria-label="Đóng"
            >
              <svg
                className="w-5 h-5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </button>
            {/* Modal body */}
            <div>
              <div className="relative flex items-end md:items-center aspect-square md:aspect-auto gap-0 md:gap-5 p-4 md:px-12 md:py-8 overflow-hidden">
                {/* Hình nền */}
                {background && (
                  <Media
                    className="hidden md:block absolute inset-x-0 z-51 object-center opacity-10"
                    resource={background}
                  />
                )}

                {/* Ảnh đại diện - Mobile */}
                {avatar && (
                  <div className="block md:hidden">
                    <Media
                      imgClassName="absolute inset-0 z-51 object-cover"
                      fill
                      resource={avatar}
                    />
                    <div className="absolute inset-0 z-51 bg-linear-to-t from-white/90 to-transparent"></div>
                  </div>
                )}

                {/* Ảnh đại diện - Desktop */}
                {avatar && (
                  <div className="hidden md:block shrink-0 z-52">
                    <Media
                      imgClassName="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
                      resource={avatar}
                    />
                  </div>
                )}

                {/* Tên thành viên */}
                <div className="flex-1 pt-1 z-52">
                  {authorName && (
                    <h2 className="text-xl md:text-2xl font-bold text-secondary">{authorName}</h2>
                  )}
                  {authorRole && (
                    <p className="text-base md:text-lg text-neutral-500 mt-1">{authorRole}</p>
                  )}
                </div>
              </div>

              {/* Nội dung thông tin */}
              {description && (
                <div className="mt-6 text-left space-y-3 pb-4 px-4 md:px-12 md:pb-8">
                  <RichText
                    className="text-secondary leading-relaxed"
                    data={description}
                    enableGutter={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalButton
