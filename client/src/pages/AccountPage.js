import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const AccountPage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    gender: user?.gender || 'male',
    avatar: user?.avatar || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <Container>
      <ProfileCard>
        <Header>
          <h2>Мой профиль</h2>
          {!isEditing ? (
            <EditButton onClick={() => setIsEditing(true)}>
              Редактировать
            </EditButton>
          ) : (
            <div>
              <SaveButton onClick={handleSubmit}>Сохранить</SaveButton>
              <CancelButton onClick={() => setIsEditing(false)}>
                Отмена
              </CancelButton>
            </div>
          )}
        </Header>

        <ProfileContent>
          <AvatarSection>
            <AvatarPreview src={isEditing ? formData.avatar : user?.avatar}>
              {!user?.avatar && !formData.avatar && (
                <DefaultAvatar>
                  {user?.firstName?.charAt(0) || 'П'}
                </DefaultAvatar>
              )}
            </AvatarPreview>
            {isEditing && (
              <AvatarUpload>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
                <label htmlFor="avatar-upload">Сменить фото</label>
              </AvatarUpload>
            )}
          </AvatarSection>

          <ProfileDetails>
            {isEditing ? (
              <EditForm>
                <FormGroup>
                  <label>Имя</label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Фамилия</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Пол</label>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                    <option value="other">Другой</option>
                  </Select>
                </FormGroup>
              </EditForm>
            ) : (
              <ReadOnlyInfo>
                <InfoItem>
                  <span>Имя:</span>
                  <strong>{user?.firstName || 'Не указано'}</strong>
                </InfoItem>
                <InfoItem>
                  <span>Фамилия:</span>
                  <strong>{user?.lastName || 'Не указано'}</strong>
                </InfoItem>
                <InfoItem>
                  <span>Пол:</span>
                  <strong>
                    {user?.gender === 'male' ? 'Мужской' : 
                     user?.gender === 'female' ? 'Женский' : 
                     user?.gender || 'Не указано'}
                  </strong>
                </InfoItem>
              </ReadOnlyInfo>
            )}
          </ProfileDetails>
        </ProfileContent>
      </ProfileCard>
    </Container>
  );
};

// Стилизованные компоненты
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const ProfileContent = styled.div`
  display: flex;
  padding: 2rem;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const AvatarPreview = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f2f5;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const DefaultAvatar = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: #4361ee;
`;

const AvatarUpload = styled.div`
  label {
    padding: 0.5rem 1rem;
    background: #4361ee;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #3a56d4;
    }
  }
`;

const ProfileDetails = styled.div`
  flex: 1;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #555;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  max-width: 400px;

  &:focus {
    outline: none;
    border-color: #4361ee;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  max-width: 400px;
  background: white;
`;

const ReadOnlyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 1rem;

  span {
    color: #777;
    min-width: 100px;
  }

  strong {
    color: #333;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 0.5rem;
`;

const EditButton = styled(Button)`
  background: #4361ee;
  color: white;
  border: none;

  &:hover {
    background: #3a56d4;
  }
`;

const SaveButton = styled(Button)`
  background: #4caf50;
  color: white;
  border: none;

  &:hover {
    background: #43a047;
  }
`;

const CancelButton = styled(Button)`
  background: #f5f5f5;
  color: #555;
  border: 1px solid #ddd;

  &:hover {
    background: #e0e0e0;
  }
`;

export default AccountPage;