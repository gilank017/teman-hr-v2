import React, { useState, useEffect } from 'react'
import { Box, TextInput, Textarea, Button, Group, Flex, Select } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { validation } from '@/plugins/validation'
import { addPosition, updatePosition } from '@/services/position'
import { notificationSuccess, notificationError } from '@/components/ui/Notifications'

const defaultVal = {
  name: '',
  level: '1',
  description: '',
}

const formValidation = {
  name: {
    isError: false,
    message: ''
  },
  level: {
    isError: false,
    message: ''
  }
}


const FormAdjustPosition = ({ dataPosition, onCloseForm, reloadList }) => {
  const { t } = useTranslation('translation')
  const [formData, setFormData] = useState(defaultVal)
  const [validationForm, setValidationForm] = useState(formValidation)
  const [loadingForm, setLoadingForm] = useState(false)

  const defaultLevelPosition = [
    {
      value: '1',
      label: `${t('position.level.director')}`
    },
    {
      value: '2',
      label: `${t('position.level.generalManager')}`
    },
    {
      value: '3',
      label: `${t('position.level.manager')}`
    },
    {
      value: '4',
      label: `${t('position.level.staff')}`
    },
    {
      value: '5',
      label: `${t('position.level.nonStaff')}`
    },
  ]

  const submitPosition = async (form) => {
    setLoadingForm(true)
    let methodFunction = null
    let titleMessageSuccess = ''
    let captionMessageSuccess = ''
    let titleMessageError = ''
    let captionMessageError = ''
    setValidationForm(formValidation)
    const validateForm = {
      name: form.name,
      level: `${form.level}`
    }
    const isError = validation(validateForm, setValidationForm)
    console.log(isError)
    if (isError) {
      setLoadingForm(false)
      return
    }
    const payload = {
      name: form.name,
      level: Number(form.level),
      description: form.description !== '' ? form.description : '-',
    }
    if (dataPosition === null) {
      methodFunction = addPosition(payload)
      titleMessageSuccess = 'Tambah Posisi Jabatan Berhasil'
      captionMessageSuccess = 'Anda telah berhasil menambahkan posisi jabatan baru'
      titleMessageError = 'Gagal Menambahkan Posisi Jabatan'
    } else {
      methodFunction = updatePosition(form.id, payload)
      titleMessageSuccess = 'Update Posisi Jabatan Berhasil'
      captionMessageSuccess = 'Anda telah berhasil mengupdate posisi jabatan'
      titleMessageError = 'Gagal Mengupdate Posisi Jabatan'
    }
    try {
      const response = await methodFunction
      if (response.success) {
        onCloseForm()
        reloadList()
        notificationSuccess(titleMessageSuccess, captionMessageSuccess)
      }
    } catch (error) {
      console.log(error)
      setLoadingForm(false)
      const errorMessage = error.response.success
      captionMessageError = Object.keys(errorMessage) ? errorMessage : 'Silahkan cek kembali form anda'
      notificationError(titleMessageError, captionMessageError)
      Object.values(errorMessage).forEach((el) => {
        Object.keys(formValidation).forEach((element) => {
          if (el.includes(element)) {
            setValidationForm((old) => ({
              ...old,
              [element]: {
                ...old?.[element],
                isError: true,
                message: el
              }
            }))
          }
        })
      })
    } finally {
      setLoadingForm(false)
    }
  }

  useEffect(() => {
    if (dataPosition !== null) {
      handleSetForm(dataPosition)
    }
  }, [dataPosition])

  const handleSetForm = (dataPosition) => {
    const dataDetail = {
      id: dataPosition.id,
      name: dataPosition.name,
      level: dataPosition.level,
      description: dataPosition.description,
    }
    setFormData(dataDetail)
  }

  const handleChangeForm = (name, val) => {
    setFormData((oldVal) => ({ ...oldVal, [name]: val}))
  }

  return (
    <Box>
      <Box mb='sm'>
        <TextInput
          name='name'
          value={formData.name}
          label={`${t('position.table.positionName')}`}
          error={validationForm.name.isError ? `${validationForm.name.message}` : ''}
          onChange={(val) => handleChangeForm('name', val.target.value)}
          withAsterisk
          size='xs'
        />
      </Box>
      <Box mb='sm'>
        <Select
          name='level'
          value={formData.level}
          label={`${t('position.table.positionLevel')}`}
          data={defaultLevelPosition}
          error={validationForm.level.isError ? `${validationForm.level.message}` : ''}
          onChange={(val) => handleChangeForm('level', val)}
          withAsterisk
          size='xs'
          allowDeselect={false}
        />
      </Box>
      <Box mb='sm'>
        <Textarea
          name='description'
          value={formData.description}
          label={`${t('position.table.positionDescription')}`}
          onChange={(val) => handleChangeForm('description', val.target.value)}
          size='xs'
          autosize
          minRows={4}
          maxRows={4}
        />
      </Box>
      <Box mt={20}>
        <Flex justify='flex-end'>
          <Group>
            <Button size='xs' variant="outline" onClick={onCloseForm}>{t('actionButton.close')}</Button>
            <Button size='xs' loading={loadingForm} variant="filled" onClick={() => submitPosition(formData)}>{dataPosition === null ? t('actionButton.add') : t('actionButton.update')}</Button>
          </Group>
        </Flex>
      </Box>
    </Box>
  )
}

export default FormAdjustPosition