import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests'

const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ['anecdotes'], queryFn: getAnecdotes, retry: false })
  const createMutation = useMutation({ mutationFn: createAnecdote, onSuccess: (created) => queryClient.setQueryData(['anecdotes'], (old = []) => old.concat(created)) })
  const voteMutation = useMutation({ mutationFn: updateAnecdote, onSuccess: (updated) => queryClient.setQueryData(['anecdotes'], (old = []) => old.map((item) => item.id === updated.id ? updated : item)) })
  return { query, createAnecdote: createMutation.mutateAsync, voteAnecdote: voteMutation.mutateAsync }
}
export default useAnecdotes
