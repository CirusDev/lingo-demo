
type Props = {
  children: React.ReactNode
}

export const StickyWrapper = ({ children }:Props) => {
  return (
    <div className="sticky hidden lg:block w-80 self-end bottom-6">
      <div className="sticky flex flex-col min-h-[calc(100vh-48px)] top-6 gap-y-4">
        {children}
      </div>
    </div>
  )
}