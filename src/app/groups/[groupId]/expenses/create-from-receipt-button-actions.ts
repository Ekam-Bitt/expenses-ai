'use server'
import { getCategories } from '@/lib/api'
import { env } from '@/lib/env'
import { formatCategoryForAIPrompt } from '@/lib/utils'
import OpenAI from 'openai'

const openai = env.GEMINI_API_KEY
  ? new OpenAI({
      apiKey: env.GEMINI_API_KEY,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    })
  : null

export async function extractExpenseInformationFromImage(
  imageUrl: string,
): Promise<{
  amount: number | null
  categoryId: string | null
  date: string | null
  title: string | null
}> {
  'use server'
  const categories = await getCategories()

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `
                  This image contains a receipt.
                  Read the total amount and store it as a non-formatted number without any other text or currency.
                  Then guess the category for this receipt among the following categories and store its ID: ${categories.map(
                    (category) => formatCategoryForAIPrompt(category),
                  )}.
                  Guess the expense’s date and store it as yyyy-mm-dd.
                  Guess a title for the expense.
                  Return the amount, the category, the date and the title with just a comma between them, without anything else.`,
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
      })

      const [amountString, categoryId, date, title] = completion.choices
        .at(0)
        ?.message.content?.split(',') ?? [null, null, null, null]
      return { amount: Number(amountString), categoryId, date, title }
    } catch (error) {
      console.error('Gemini vision extraction error:', error)
      return { amount: null, categoryId: null, date: null, title: null }
    }
  }

  return { amount: null, categoryId: null, date: null, title: null }
}

export type ReceiptExtractedInfo = Awaited<
  ReturnType<typeof extractExpenseInformationFromImage>
>
