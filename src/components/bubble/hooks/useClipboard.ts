import { useState } from "react"

export const useClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async (text, options = {}) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text)
            }
            // 兼容旧浏览器
            else {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                document.body.appendChild(textArea)
                textArea.select()

                const success = document.execCommand('copy')
                if (!success) throw new Error('复制失败')

                document.body.removeChild(textArea)
            }
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), options.timeout || 1500)
            return true
        } catch (err) {
            console.error('复制失败', err)
            return false
        }
    }

    return [isCopied, copyToClipboard]
}