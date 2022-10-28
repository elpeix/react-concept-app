import { useEffect, useRef } from "react"

const useOnce = (condition: () => boolean, callback: () => void, dependences: unknown[] = []) => {

    const called = useRef(false)

    useEffect(() => {
      if (called.current || !condition()) {
        return
      }
      called.current = true
      callback()
    }, [dependences])
    
}

export default useOnce