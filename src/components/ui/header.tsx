import NinjaLogo from '@/assets/NinjaOneLogo.png'

export const Header = () => {
  return (
    <header className="bg-deep-ocean">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <img src={NinjaLogo} alt="NinjaOne Logo" />
      </div>
    </header>
  )
}
