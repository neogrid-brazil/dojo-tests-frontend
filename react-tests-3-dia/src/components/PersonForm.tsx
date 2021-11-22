import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { PersonType } from 'interfaces/Person'

interface PersonFormProps {
  loading: boolean
  createPerson(name: string): Promise<PersonType>
  fetchPersons(): void
}

const PersonForm: React.FC<PersonFormProps> = ({
  createPerson,
  fetchPersons,
  loading,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<PersonType>()

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  const onSubmit = async ({ name }: PersonType) => {
    await createPerson(name)
    await fetchPersons()
    setFocus('name')
    setValue('name', '')
  }

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('name', { required: true })} />
          {errors.name?.type === 'required' && (
            <p style={{ color: 'red' }}>Nome é obrigatório.</p>
          )}
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
