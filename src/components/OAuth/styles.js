import styled from 'styled-components'

export const OAuthContainer = styled.div`
    display: flex; 
    width: 80%; 
    height: 100%;
    justify-content: center; 
    align-items: center;
    flex-direction: column;
    margin: 30px 0px 30px 0px;
`

export const OAuthButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background-color: white;
    width: 100%;
    border-radius: 5px;
    margin: 5px;
    height: 40px;
    border: solid #aaaaaa;
`
export const OAuthText = styled.p`
    padding: 0px;
    margin: 0px;
    height: auto;
    font-size: 14px;
    width: 100%;
    border-color: #aaaaaa;
    color: #aaaaaa;
    
`

export const OAuthImage = styled.img`
    display: flex;
    justify-content: center;
    height: 30px;
    width: 30px;
`

export const OAuthImageContainer = styled.div`
    display: flex;
    padding: 0px;
    height: 30px;
    margin-left: 5%;
    width: 100px;
    justify-content: center;
    align-items: center;
`

export const TopVerticalLine = styled.div`
    border-left: thin solid #aaaaaa;
    height: 100px;
`
export const BottomRegisterVerticalLine = styled.div`
    border-left: thin solid #aaaaaa;
    height: 200px;
`

export const EmailDividerContainer = styled.div`
    display: flex; 
    width: 3%; 
    height: 100%;
    justify-content: flex-start; 
    align-items: center;
    flex-direction: column;
`

export const EmailAccountContainer = styled.div`
    display: flex; 
    width: 37.5%; 
    height: 100%;
    justify-content: flex-start; 
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
    margin-left: 5%;
    color: #aaaaaa;
`

export const SwitchContainer = styled.div`
    display: flex; 
    width: 100%; 
    height: 100%;
    justify-content: center; 
    align-items: center;
`

// TO DO: add a standard font
export const Text = styled.p`
    display: flex;
    align-items: center;
    padding: 0px;
    margin: 0px;
    height: 40px;
    color: #aaaaaa;
`

export const InputSpan = styled.span`
    display: block;
    overflow: hidden;
    width: 100%;
    margin: 5px;
    color: #aaaaaa;
`

export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    justify-content: center;
    align-items: center;
`